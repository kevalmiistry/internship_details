import React, { FC, useEffect, useState } from 'react'
import S from './InternshipCard.module.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'

type TProp = {
    record: TInternshipData
}
const InternshipCard: FC<TProp> = ({ record }) => {
    const [usersData, setUsersData] = useState<TUserData>({} as TUserData)

    useEffect(() => {
        const getInternships = async () => {
            const usersRef = collection(db, 'users')
            const queryRef = query(usersRef, where('uid', '==', record.uid))
            const querySnapshot = await getDocs(queryRef)

            const data = querySnapshot?.docs?.map(
                (doc) => ({ ...doc.data() } as TUserData)
            )
            if (data.length > 0) {
                setUsersData({ ...data[0] })
            }
        }
        getInternships()
    }, [])
    return (
        <div className={S.card}>
            <div>
                <div className='flex'>
                <img className={S.profile_pic} src={usersData?.profile_pic ?  `//wsrv.nl/?url=${usersData?.profile_pic}`:''} alt="profile" />
                <p className={S.name}>{usersData.name}</p>
                </div>
                <h4 className={S.comp_name}>
                    Company: <span>{record.company_name}</span>
                </h4>
                <h5 className={S.internship}>
                    Role: <span>{record.internship_title}</span>
                </h5>
                <p className={S.stipend}>
                    Stipend🤑: <span>₹{record.stipend}/-</span> {'(per month)'}
                </p>
                <p className={S.techs}>
                    Techonlogies: <br />
                </p>
                {record.technologies.length > 0 ?
                record.technologies.map((item, idx) => (
                    <span key={idx} className={S.tech_item}>{item}</span>
                ))
                : 'No Technoloy specified'
                }
                <p className={S.time}>
                    Timing: <span className={S.timing}>{record.time_from}</span>{' '}
                    to <span className={S.timing}>{record.time_to}</span>{' '}
                </p>
                <p className={S.exp}>
                    Experience: <span>{record.experience}</span>
                </p>
            </div>
        </div>
    )
}

export default InternshipCard
