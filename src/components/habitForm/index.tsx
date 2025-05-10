import styled from "styled-components";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HabitContext } from "../../contexts/HabitContext";
import { HabitFrequency, HabitMethod, HabitType } from "../../types/habitData";

interface HabitFormProps {
    onClose: () => void;
    mode: "create" | "edit";
}

const habitSchema = z.object({
    title: z.string().min(1, "Título é obrigatório").max(40, "Máximo de 40 caracteres"),
    description: z.string().max(75, "Máximo de 75 caracteres"),
    method: z.nativeEnum(HabitMethod),
    frequency: z.nativeEnum(HabitFrequency),
    type: z.nativeEnum(HabitType),
    duration: z.coerce.number({ message: 'Apenas números' }).min(1, "Duração mínima de 1 dia").max(9000, "Máximo de 9000 dias"),
    successPoints: z.coerce.number().min(0),
    failurePoints: z.coerce.number().min(0),
});

type HabitFormSchema = z.infer<typeof habitSchema>;

export const HabitForm = ({ onClose, mode }: HabitFormProps) => {
    const { addHabit } = useContext(HabitContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<HabitFormSchema>({
        resolver: zodResolver(habitSchema),
        mode: "onBlur",
        defaultValues: {
            title: "",
            description: "",
            method: HabitMethod.INSTANTANEO,
            frequency: HabitFrequency.DIARIAMENTE,
            type: HabitType.RUIM,
            duration: 30,
            successPoints: 2,
            failurePoints: 4,
        },
    });

    const onSubmit = async (data: HabitFormSchema) => {
        try {
            if (mode === "create") {
                await addHabit(data);
            }
            onClose();
        } catch (error) {
            console.error("Erro ao criar hábito:", error);
        }
    };

    const methodLabels: Record<HabitMethod, string> = {
        [HabitMethod.INSTANTANEO]: "Sim / Não",
        [HabitMethod.QUANTIDADE]: "Contagem",
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formHeader">
                    <h2>{mode === "create" ? "Criar Novo Hábito" : "Editar Hábito"}</h2>
                    <span className="material-symbols-outlined close" onClick={onClose}>
                        close
                    </span>
                </div>

                <div className="formGroup">
                    <label htmlFor="title">Título</label>
                    <input id="title" {...register("title")} />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Descrição (opcional)</label>
                    <textarea id="description" rows={5} maxLength={75} {...register("description")} />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>

                <div className="formRow">
                    <div className="formGroup">
                        <label htmlFor="method">Método</label>
                        <select id="method" {...register("method")}>
                            {Object.values(HabitMethod).map((method) => (
                                <option key={method} value={method}>
                                    {methodLabels[method]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="type">Tipo de hábito</label>
                        <select id="type" {...register("type")}>
                            {Object.values(HabitType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="formRow">
                    <div className="formGroup">
                        <label htmlFor="frequency">Frequência</label>
                        <select id="frequency" {...register("frequency")}>
                            {Object.values(HabitFrequency).map((frequency) => (
                                <option key={frequency} value={frequency}>
                                    {frequency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="duration">Duração (Dias)</label>
                        <input type="text" inputMode="numeric" id="duration" {...register("duration")} />
                        {errors.duration && <span>{errors.duration.message}</span>}
                    </div>
                </div>

                <div className="formRow">
                    <div className="formGroup">
                        <label htmlFor="successPoints">Recompensa (diária)</label>
                        <input type="number" id="successPoints" {...register("successPoints")} />
                        {errors.successPoints && <span>{errors.successPoints.message}</span>}
                    </div>

                    <div className="formGroup">
                        <label htmlFor="failurePoints">Penalidade (diária)</label>
                        <input type="number" id="failurePoints" {...register("failurePoints")} />
                        {errors.failurePoints && <span>{errors.failurePoints.message}</span>}
                    </div>
                </div>

                <div className="buttonGroup">
                    <button type="button" className="cancelBtn" onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="submit" className="saveBtn" disabled={isSubmitting}>
                        {mode === "create" ? "Criar" : "Salvar"}
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: white;

  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .close {
    cursor: pointer;
    font-size: 24px;
    &:hover {
      color: #ccc;
    }
  }

  .formGroup {
    margin-bottom: 15px;
    width: 100%;

    span {
      display: block;
      color: #ff5a5f;
      font-size: 12px;
      margin-top: 4px;
    }
  }

  .formRow {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: var(--light-background);
    color: white;
    font-size: 14px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--tertiary);
    }

    &:invalid {
      border-color: #ff5a5f;
    }
  }

  select {
    text-transform: lowercase;
    cursor: pointer;
  }

  textarea {
    resize: vertical;
  }

  .buttonGroup {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
  }

  .cancelBtn {
    background: transparent;
    border: 1px solid var(--tertiary);
    color: white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .saveBtn {
    background-color: var(--tertiary);
    color: white;

    &:hover {
      background-color: #3a49d0;
    }
  }
`;