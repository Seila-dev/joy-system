type QuestStatus = "NULO" | "ATIVO" | "INATIVO"; // exemplo de enum
type TimelineCategory = "DIÁRIA" | "SEMANA" | "MÊS"

type User = {
    id: number
    email: string
    username: string
}

export interface QuestTypeData {
    id: number
    title: string
    description: string
    validation: string
    highlight: boolean
    status: QuestStatus
    timeline: TimelineCategory
    userId: string
    createdAt: string
    updatedAt: string
    user: User
}