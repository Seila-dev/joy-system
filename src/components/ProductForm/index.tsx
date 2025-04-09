import { useContext, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '../errorMessage'
import "react-datepicker/dist/react-datepicker.css"
import { JoyStoreItem } from '../../types/joyData'
import { Loading } from '../loading'
import { ProductContext } from '../../contexts/ProductContext'

const productSchema = z.object({
    name: z.string().min(1, { message: "Título é obrigatório" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    price: z.number().min(0, { message: "Preço não pode ser negativo" }).nonnegative({ message: "Preço não pode ser negativo" }),
    featured: z.boolean(),
    isActive: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
    onClose?: () => void;
    initialData?: JoyStoreItem | null;
    mode?: 'create' | 'edit';
}

export const ProductForm: React.FC<ProductFormProps> = ({
    onClose,
    initialData = null,
    mode = 'create'
}) => {

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: 'onBlur',
        defaultValues: mode === 'edit' && initialData ? {
            name: initialData.name ?? "",
            description: initialData.description ?? '',
            price: initialData.price ?? 0,
            featured: initialData.featured ?? false,
            isActive: initialData.isActive ?? true
        } : {
            name: '',
            description: '',
            price: 0,
            featured: false,
            isActive: true
        }
    })

    const { addProduct, editProduct, loading } = useContext(ProductContext)

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    const onSubmit = async (data: ProductFormData) => {
        try {
            const productData: Omit<JoyStoreItem, 'id' | 'createdAt' | 'updatedAt'> = {
                ...data,
            };

            if (mode === 'create') {
                await addProduct(productData as JoyStoreItem)
            } else if (mode === 'edit' && initialData?.id) {
                await editProduct({
                    ...productData,
                    id: initialData.id
                } as JoyStoreItem)
            }

            reset()
            onClose?.()
        } catch (error) {
            console.error('Erro ao adicionar ou editar produto:', error);
            alert('Erro ao adicionar ou editar produto');
        }
    };

    if(loading) return <Loading>Carregando..</Loading>


    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="headerForm">
                    <h2>{mode === 'create' ? 'Criar Novo Produto' : 'Editar Produto'}</h2>
                    <p className='description'>
                        {mode === 'create'
                            ? 'Crie um novo produto'
                            : 'Edite os detalhes do seu produto'}
                    </p>
                </div>

                <div className='item'>
                    <label htmlFor="name">Título</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="title"
                                type="text"
                            />
                        )}
                    />
                    <p className='description'>Um belo título para nomear seu próximo produto</p>
                    {errors?.name && <ErrorMessage>{errors?.name.message}</ErrorMessage>}
                </div>

                <div className='item'>
                    <label htmlFor="description">Descrição</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="description"
                            />
                        )}
                    />
                    <p className="description">Descreva detalhes sobre o produto</p>
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </div>

                <div className="gridContainer">
                    <div className='item'>
                        <label htmlFor="price">Preço em Joys</label>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field: { onChange, ...field } }) => (
                                <input
                                    {...field}
                                    id="price"
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        onChange(Number(value));
                                    }}
                                    value={field.value.toString()}
                                    placeholder="0"
                                    maxLength={5}
                                />
                            )}
                        />
                        <p className="description">Recompensa em joys pela quest</p>
                    </div>

                    <div className='item'>
                        <div className="highlightDiv">
                            <label htmlFor="highlight">Em Destaque</label>
                            <Controller
                                name="featured"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <input
                                            id="highlight"
                                            className='highlight'
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        />
                                        <label htmlFor="highlight"></label>
                                    </>
                                )}
                            />
                        </div>
                        <p className="description">Ative para destacar o produto</p>
                    </div>
                    <div className='item'>
                        <div className="highlightDiv">
                            <label htmlFor="active">Ativo</label>
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <input
                                            id="active"
                                            className='active'
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        />
                                        <label htmlFor="active"></label>
                                    </>
                                )}
                            />
                        </div>
                        <p className="description">Desative se quiser arquivar o produto</p>
                    </div>
                </div>

                <div className="buttons">
                    <button className='cancelBtn btnForm' onClick={() => onClose?.()}>Cancel</button>
                    <button type="submit" disabled={isSubmitting} className='submitBtn btnForm'>
                        {mode === 'create' ? 'Criar Quest' : 'Atualizar Quest'}
                    </button>
                </div>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Form = styled.form`
    width: 100%;
    max-width: 700px;
    padding: 30px;
    background: var(--background);
    color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    max-height: 700px;
    overflow-y: auto;
    z-index: 1000;

    .headerForm {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .description {
        margin: 5px 0 10px 0;
    }

    input, select, textarea {
        background: black;
        color: white;
        border-radius: 5px;
        border: 1px solid var(--light-background);
        outline: none;
        padding: 10px;
        font-size: 15px;
        width: 100%;
    }

    input:focus{
        outline: 1px solid #ccc;
    }

    textarea {
        height: 200px;
        resize: none;
    }

    select {
        cursor: pointer;
    }

    label {
        margin: 10px 0;
    }

    .item {
        display: flex;
        flex-direction: column;
    }

    .item .highlightDiv {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .item input[type="checkbox"] {
        accent-color: var(--secondary);
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: none;
    }

    .gridContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .btnForm {
        padding: 10px;
        align-items: center;
        justify-content: center;
        background: var(--secondary);
        cursor: pointer;
        color: black;
        border: none;
        border-radius: 5px;
        font-weight: 700;
        width: 120px;

    }

    .cancelBtn {
        background: transparent;
        border: 1px solid #ccc;
        color: white;
    }

    @media (max-width: 768px) {
        .gridContainer {
            grid-template-columns: 1fr;
        }

        .headerForm h2 {
            font-size: 20px;
        }

        .headerForm .description {
            font-size: 14px;
        }

        .submitBtn, .cancelBtn {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        padding: 20px;
    }
`;