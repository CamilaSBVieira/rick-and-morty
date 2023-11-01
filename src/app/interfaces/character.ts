
type Status = 'Alive' | 'Dead' | 'unknown'

type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

interface CharacterLocationProp {
    name: string
    url: string
}

export interface Character {
    id: number
    name: string
    status: Status
    species: string
    type?: string
    gender: Gender
    origin: CharacterLocationProp
    location: CharacterLocationProp
    image: string
    episode: string[]
    url: string
    created: string
}