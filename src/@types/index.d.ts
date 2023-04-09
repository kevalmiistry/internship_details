declare interface TInternshipData {
    id?: string
    uid: string
    company_name: string
    internship_title: string
    stipend: number
    technologies: string[]
    time_from: string
    time_to: string
    experience: string
}

declare interface TUserData {
    uid: string
    name: string | null
    profile_pic: string | null
    email: string | null
    internship: boolean
}
