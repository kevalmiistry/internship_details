import React, { FC } from 'react'
import S from './InternshipCard.module.css'

type TProp = {
    record: TInternshipData
}
const InternshipCard: FC<TProp> = ({ record }) => {
    return <div className={S.card}></div>
}

export default InternshipCard
