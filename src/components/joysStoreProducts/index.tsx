import { useContext, useState } from "react"
import styled from "styled-components"
import api from "../../services/api"
import { JoyStoreItem } from "../../types/joyData"
import { AuthContext } from "../../contexts/AuthContext"
import { JoysContext } from "../../contexts/JoysContext"
import { toast, Toaster } from "sonner"
import { parseCookies } from "nookies"
import { ProductForm } from "../ProductForm"
import { ProductContext } from "../../contexts/ProductContext"

interface ProductActiveProp {
    active: boolean;
}

export const JoysStoreProducts = ({ active }: ProductActiveProp) => {

    const { user } = useContext(AuthContext)
    const { products, deleteProduct, loading } = useContext(ProductContext)
    const { balance } = useContext(JoysContext)
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [editQuestData, setEditQuestData] = useState<JoyStoreItem | null>(null)
    const [_, setOpenStatus] = useState<number | null>(null)

    const filteredProducts = () => {
        if(active === true){
            const filter = products?.filter(product => product.isActive === true)
            return filter
        } else if (active === false){
            const filter = products?.filter(product => product.isActive === false)
            return filter
        }   
    }

    const createQuestForm = (questData: JoyStoreItem) => {
        setEditQuestData(questData);
        setOpen(true);
    };

    const closeCreateForm = () => {
        setOpen(false)
    }

    const updateMenu = (id: number) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
            setOpenStatus(null);
        }
    }

    const handlePurchase = async (product: JoyStoreItem) => {
        try {
            if (!user) {
                toast.error('Por favor, faça login para ter items');
                return;
            }

            if ((balance ? balance : 0) < product.price) {
                toast.error(`Não é o suficiente! Precisa de ${product.price} Moedas para esse produto.`);
                return;
            }

            const confirmed = window.confirm(
                `Você quer comprar ${product.name} por ${product.price} Moedas?`
            );

            if (confirmed) {
                const { 'joysystem.token': token } = parseCookies();
                await api.post('/store/purchase', { userId: user.id, productId: product.id }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success(`Comprou o produto ${product.name} com suceso!`);
            }
        } catch (error: any) {
            console.error('Purchase failed:', error);
            toast.error(error.response?.data?.error || 'Falhou em completar a compra. Talvez você já tenha esse produto.');
        }
    }

    if (loading) return <p>Carregando</p>

    return (
        <>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                filteredProducts()?.map((product) => (

                    <ProductElement key={product.id}>
                        <Toaster></Toaster>
                        <div className="highlight">
                            <span className={product.featured ? 'highlightSpan' : ''}>{product.featured ? 'Em destaque' : ''}</span>
                        </div>
                        <h3 className="title">{product.name}</h3>
                        <p className="description">{product.description}</p>
                        <div className="footer">
                            <div className="joys">
                                <span className="material-symbols-outlined icon">
                                    paid
                                </span>
                                <p>{product.price}</p>
                            </div>
                            <div className="options">
                                <span className="material-symbols-outlined icon" onClick={() => updateMenu(product.id)}>
                                    more_vert
                                </span>
                            </div>
                        </div>
                        {active === true ? (
                            <button
                            className={!user ? 'purchaseBtn stopActions' : (balance ? balance : 0) < product.price ? 'purchaseBtn stopActions' : 'purchaseBtn'} onClick={() => { handlePurchase(product); }}
                            disabled={!user || (balance ? balance : 0) < product.price}
                        >
                            <span className="material-symbols-outlined icon">
                                shopping_cart
                            </span>
                            <p > {!user ? 'Você não está logado.' : (balance ? balance : 0) < product.price ? 'Saldo de Moedas Insuficiente' : 'Comprar'}</p>
                        </button>
                        ) : (
                            <button className="purchaseBtn stopActions" disabled>Produto inativo</button>
                        ) }
                        
                        {activeMenuId === product.id &&
                            <EditPopup>
                                <div onClick={() => deleteProduct(product.id)} >
                                    <span className="material-symbols-outlined deleteIcon icon">
                                        delete
                                    </span>
                                    <button className="delete-btn btn">Deletar</button>
                                </div>
                                <div onClick={() => createQuestForm(product)}>
                                    <span className="material-symbols-outlined editIcon icon">
                                        edit_square
                                    </span>
                                    <button className="edit-btn btn">Editar</button>
                                </div>
                            </EditPopup>
                        }

                        {open && <Overlay onClick={() => closeCreateForm()} />}
                        {open && activeMenuId === product.id && (
                            <ProductForm
                                onClose={() => setOpen(false)}
                                mode="edit"
                                initialData={editQuestData}
                            />
                        )}
                    </ProductElement>
                ))
            )}

        </>
    )

}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 4; 
    pointer-events: all; 
`

const ProductElement = styled.div`
    background: transparent;
    border: 1px solid #fff93d1c;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    .highlight{
        display: flex;
        margin-bottom: 10px;
    }
    .description{
        margin: 10px 0;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }
    .footer .options{
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        cursor: pointer;
        user-select: none;
    }
    .footer .options:hover{
        background: #ccc2;
    }
    .footer .joys{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .purchaseBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        padding: 10px;
        background: var(--secondary);
        color: black;
        width: 100%;
        font-weight: 700;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        gap: 10px;
    }
    .purchaseBtn .icon{
        font-size: 18px;
    }
    .purchaseBtn.stopActions{
        opacity: 0.2;
        user-select: none;
        pointer-events: none;
        cursor: inherit;
    }

`

const EditPopup = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 60px;
    bottom: 70px;
    background: #00041a;
    border: 1px solid var(--tertiary);
    border-radius: 5px 0 5px 5px;
    padding: 5px 0;
    div{
        cursor: pointer;
        display: flex;
        padding: 10px 15px;
        &:hover{
            background: #ccf2;
        }       
    }
    div .btn{
        margin-left: 10px;
        border: none;
        cursor: pointer;
        background: none;
        color: var(--secondary);
    }
    div .icon{
        font-size: 20px
    }
`