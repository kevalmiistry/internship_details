import { FC, useEffect, useState } from 'react'
import { getUserState } from '../contexts/UserContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import InternshipCard from './InternshipCard'
import Navbar from './Navbar'

const internshipsCollRef = collection(db, 'internships')

type TProp = {}
const Home: FC<TProp> = () => {
    const { intershipData, setIntershipData } = getUserState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getInternships = async () => {
            setLoading(true)
            const data = await getDocs(internshipsCollRef)
            setIntershipData(
                data.docs.map(
                    (doc) => ({ ...doc.data(), id: doc.id } as TInternshipData)
                )
            )
            setLoading(false)
        }
        getInternships()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                {loading ? (
                    <div style={{ textAlign: 'center' }}>Loading....</div>
                ) : (
                    <>
                        {intershipData ? (
                            intershipData?.map((record) => (
                                <InternshipCard
                                    key={record.id}
                                    record={record}
                                />
                            ))
                        ) : (
                            <>No Data at this moment</>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default Home
