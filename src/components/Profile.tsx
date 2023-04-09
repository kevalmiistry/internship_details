import React, { FC, useEffect, useState } from 'react'
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'
import { getUserState } from '../contexts/UserContext'
import { db } from '../config/firebase'
import { MdClose } from 'react-icons/md'
import InternshipCard from './InternshipCard'
import Navbar from './Navbar'
import S from './Profile.module.css'

type TProp = {}
const Profile: FC<TProp> = () => {
    const { userData, setUserData } = getUserState()
    const [showForm, setShowForm] = useState(!userData?.internship)
    const [internshipDetails, setInternshipDetails] =
        useState<TInternshipData | null>(null)

    const handleFormClose = () => {
        if (internshipDetails) {
            setFormData(internshipDetails)
            setTechCounts(internshipDetails.technologies.length)
            setTechItems(internshipDetails.technologies)
        }
        setShowForm(false)
    }

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
            )[0]

            setInternshipDetails(internData)
            if (internData) {
                setFormData(internData)
                setTechCounts(internData.technologies.length)
                setTechItems(internData.technologies)
            }
        }

        if (userData?.internship) {
            checkIsInternshipAdded()
        }
    }, [])

    const [techCounts, setTechCounts] = useState(0)
    const [techItems, setTechItems] = useState<string[]>([])

    const [formData, setFormData] = useState<TInternshipData>({
        company_name: '',
        internship_title: '',
        stipend: 0,
        experience: '',
        technologies: techItems,
        time_from: '',
        time_to: '',
        uid: userData?.uid as string,
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            technologies: techItems,
        }))
    }, [techItems])

    /*--------------------------------------------------------------*/
    const [errMsg, setErrMsg] = useState('')
    const validate = () => {
        if (
            formData.company_name &&
            formData.experience &&
            formData.internship_title &&
            formData.stipend &&
            formData.technologies &&
            formData.time_from &&
            formData.time_to
        ) {
            setErrMsg('')
            return true
        } else {
            setErrMsg('Laude sab details bhar! 🤨')
            return false
        }
    }

    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validate()) return
        try {
            const internsRef = collection(db, 'internships')
            setSubmitting(true)
            if (userData?.internship && internshipDetails) {
                const recordRef = query(
                    internsRef,
                    where('uid', '==', userData.uid)
                )

                const snapshot = await getDocs(recordRef)
                const docRef = doc(internsRef, snapshot.docs[0].id)

                await setDoc(docRef, formData, { merge: true })

                setInternshipDetails(formData)
                setSubmitting(false)
                setShowForm(false)
                return
            }
            const data = await addDoc(internsRef, formData)
            const newData = await getDoc(data)
            setInternshipDetails(() => {
                const data = {
                    ...newData.data(),
                    id: newData.id,
                } as TInternshipData
                setFormData(data)
                setTechCounts(data.technologies.length)
                setTechItems(data.technologies)

                return data
            })
            setSubmitting(false)
            setShowForm(false)

            const usersRef = collection(db, 'users')
            const queryRef = query(usersRef, where('uid', '==', userData?.uid))

            const snapshot = await getDocs(queryRef)
            const docRef = doc(usersRef, snapshot.docs[0].id)

            await setDoc(docRef, { internship: true }, { merge: true })

            const snapshot2 = await getDocs(queryRef)
            setUserData(
                snapshot2.docs.map((doc) => ({ ...doc.data() } as TUserData))[0]
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                {userData?.internship && internshipDetails ? (
                    !showForm && (
                        <>
                            <InternshipCard
                                key={internshipDetails.id}
                                record={internshipDetails}
                            />
                            <button
                                className={S.open_update_btn}
                                onClick={() => setShowForm(true)}
                            >
                                Update Details
                            </button>
                        </>
                    )
                ) : (
                    <div className="flex-center">
                        You haven't added your Internship details
                    </div>
                )}
                {showForm && (
                    <div className={S.form_container}>
                        <form onSubmit={handleSubmit}>
                            {userData?.internship && internshipDetails && (
                                <div className={S.formclose_btn}>
                                    <MdClose
                                        size={'28px'}
                                        onClick={handleFormClose}
                                    />
                                </div>
                            )}
                            <label htmlFor="company_name">Company Name</label>
                            <input
                                className="form_input"
                                type="text"
                                name="company_name"
                                id="company_name"
                                onChange={handleOnChange}
                                value={formData.company_name}
                            />
                            <label htmlFor="internship_title">
                                Internship Title
                            </label>
                            <input
                                className="form_input"
                                type="text"
                                name="internship_title"
                                id="internship_title"
                                onChange={handleOnChange}
                                value={formData.internship_title}
                            />
                            <label htmlFor="stipend">Stipend</label>
                            <input
                                className="form_input"
                                type="number"
                                name="stipend"
                                id="stipend"
                                onChange={handleOnChange}
                                value={formData.stipend}
                            />

                            <label htmlFor="stipend">Technolgies:</label>

                            <div
                                className={`flex items-center ${S.techs_wrapper}`}
                            >
                                {Array.from(Array(techCounts), (e, idx) => (
                                    <div
                                        key={idx}
                                        className={S.tech_input_wrapper}
                                    >
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

                            <div className={S.time_wrapper}>
                                <div className={S.one_time}>
                                    <label htmlFor="time_from">Time From</label>
                                    <input
                                        className={`form_input ${S.timeput}`}
                                        type="text"
                                        name="time_from"
                                        id="time_from"
                                        onChange={handleOnChange}
                                        value={formData.time_from}
                                    />
                                </div>
                                <div className={S.one_time}>
                                    <label htmlFor="time_to">Time To</label>
                                    <input
                                        className={`form_input ${S.timeput}`}
                                        type="text"
                                        name="time_to"
                                        id="time_to"
                                        onChange={handleOnChange}
                                        value={formData.time_to}
                                    />
                                </div>
                            </div>

                            <label htmlFor="experience">Experience</label>
                            <select
                                name="experience"
                                id="experience"
                                className={`form_input ${S.experience}`}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        experience: e.target.value,
                                    }))
                                }
                                value={formData.experience}
                            >
                                <option value="" selected disabled hidden>
                                    Choose here
                                </option>
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
                            <button
                                disabled={submitting}
                                type="submit"
                                style={{
                                    background: '#333',
                                    color: '#fff',
                                    marginTop: '1rem',
                                }}
                            >
                                {submitting
                                    ? 'Submitting....'
                                    : userData?.internship && internshipDetails
                                    ? 'Update!!!'
                                    : "Fuckin' Go!!!"}
                            </button>
                            <p className={S.red}>{errMsg}</p>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile
