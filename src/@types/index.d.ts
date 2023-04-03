declare interface TInternshipData {
    id: string
    company_name: string
    experience: string
    internship_title: string
    stipend: number
    technologies: string[]
    time_from: string
    time_to: string
    uid: string
}

declare interface TUserData {
    uid: string
    name: string | null
    profile_pic: string | null
    email: string | null
    internship: boolean
}
