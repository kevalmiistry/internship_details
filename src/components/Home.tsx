import { FC, useEffect } from 'react'
import { getUserState } from '../contexts/UserContext'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Navbar from './Navbar'
import InternshipCard from './InternshipCard'

const internshipsCollRef = collection(db, 'internships')

type TProp = {}
const Home: FC<TProp> = () => {
    const { intershipData, setIntershipData } = getUserState()

    useEffect(() => {
        const getInternships = async () => {
            const data = await getDocs(internshipsCollRef)
            setIntershipData(
                data.docs.map(
                    (doc) => ({ ...doc.data(), id: doc.id } as TInternshipData)
                )
            )
        }
        getInternships()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                {intershipData ? (
                    intershipData?.map((record) => (
                        <InternshipCard key={record.id} record={record} />
                    ))
                ) : (
                    <>No Data at this moment</>
                )}
            </div>
        </>
    )
}

export default Home
