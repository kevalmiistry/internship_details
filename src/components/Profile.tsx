import React, { FC, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getUserState } from '../contexts/UserContext'
import { db } from '../config/firebase'
import InternshipCard from './InternshipCard'
import S from './Profile.module.css'
import { AiOutlineClose } from 'react-icons/ai'

type TProp = {}
const Profile: FC<TProp> = () => {
    const { userData } = getUserState()
    const [internshipDetails, setInternshipDetails] =
        useState<TInternshipData | null>(null)

    useEffect(() => {
        const checkIsInternshipAdded = async () => {
            const internshipColRef = collection(db, 'internships')
            const queryRef = query(
                internshipColRef,
                where('uid', '==', userData?.uid)
            )
            const snapShot = await getDocs(queryRef)

            const internData = snapShot.docs.map(
                (doc) => ({ ...doc.data(), id: doc.id } as TInternshipData)
            )
            setInternshipDetails(internData[0])
        }

        if (userData?.internship) {
            checkIsInternshipAdded()
        }
    }, [])

    const [techCounts, setTechCounts] = useState(0)
    const [techItems, setTechItems] = useState<string[]>([])

    useEffect(() => {
        console.log(techItems)
    }, [techItems])

    return (
        <>
            <Navbar />
            <div className="container">
                {userData?.internship && internshipDetails ? (
                    <InternshipCard
                        key={internshipDetails.id}
                        record={internshipDetails}
                    />
                ) : (
                    <>
                        <div className="flex-center">
                            You haven't added your Internship details
                        </div>
                        <br />
                        <div className="flex-center">
                            <button>Add Now 🤩</button>
                        </div>
                    </>
                )}
                <div className={S.form_container}>
                    <form>
                        <label htmlFor="company_name">Company Name</label>
                        <input
                            className="form_input"
                            type="text"
                            name="company_name"
                            id="company_name"
                        />
                        <label htmlFor="internship_title">
                            Internship Title
                        </label>
                        <input
                            className="form_input"
                            type="text"
                            name="internship_title"
                            id="internship_title"
                        />
                        <label htmlFor="stipend">Stipend</label>
                        <input
                            className="form_input"
                            type="number"
                            name="stipend"
                            id="stipend"
                        />

                        <label htmlFor="stipend">Technolgies:</label>

                        <div className="flex items-center">
                            {Array.from(Array(techCounts), (e, idx) => (
                                <div key={idx} className={S.tech_input_wrapper}>
                                    <input
                                        className={S.tech_input}
                                        type="text"
                                        name={`tech${idx}`}
                                        value={techItems[idx] || ''}
                                        onChange={(e) => {
                                            setTechItems((prev) => {
                                                const temp = [...prev]
                                                temp[idx] = e.target.value
                                                return temp
                                            })
                                        }}
                                    />
                                    <AiOutlineClose
                                        className={S.icon}
                                        onClick={() => {
                                            setTechCounts((p) => p - 1)
                                            setTechItems((prev) => {
                                                const temp = [...prev]
                                                temp.splice(idx, 1)
                                                return temp
                                            })
                                        }}
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                className={S.add_btn}
                                onClick={() => setTechCounts((p) => p + 1)}
                            >
                                Add
                            </button>
                        </div>

                        <label htmlFor="time_from">Time From</label>
                        <input
                            className="form_input"
                            type="text"
                            name="time_from"
                            id="time_from"
                        />

                        <label htmlFor="time_to">Time To</label>
                        <input
                            className="form_input"
                            type="text"
                            name="time_to"
                            id="time_to"
                        />

                        <label htmlFor="experience">Experience</label>
                        <select
                            name="experience"
                            id="experience"
                            className={S.experience}
                        >
                            <option className={S.option} value="very_good">
                                Very Good 🤩
                            </option>
                            <option className={S.option} value="good">
                                Good 😀
                            </option>
                            <option className={S.option} value="average">
                                Average 🙂
                            </option>
                            <option className={S.option} value="bad">
                                Bad 😞
                            </option>
                            <option className={S.option} value="very_bad">
                                Very Bad 😖
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
