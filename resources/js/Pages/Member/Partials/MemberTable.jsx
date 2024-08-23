import { EditIcon } from "@/Components/Icon/Outline";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from "@/Components/Button";
import { formatDate } from "@/Composables/index"
import { Link } from "@inertiajs/react";

export default function MemberTable() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {

            const response = await axios.get('/member/getMemberDetails');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const ActionTemplate = (details) => {
        return (
            <div className="flex justify-center">
                <Link href={`/member/member-details/${details.id}`}>
                    <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" >
                        <EditIcon />
                    </div>
                </Link>
            </div>
        );
    };

    const RankingTemplate = (details) => {

        return (
            <div className="flex">
               {details.rank.name}
            </div>
        );
    }

    // const EmailTemplate = (details) => {

    //     return (
    //         <div className="flex">
    //            {details.email != null ? details.email : '-'} 
    //         </div>
    //     );
    // }

    // const DobTemplate = (details) => {

    //     return (
    //         <div className="flex">
    //            {details.dob != null ? details.dob : '-'} 
    //         </div>
    //     );
    // }

    const NameTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                <div>
                    <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                </div>
                <div>
                    {details.name}
                </div>
            </div>
        );
    }

    const PointTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                {details.point}pts
            </div>
        );
    }

    const JoinedTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                {formatDate(details.created_at)}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div></div>
            <div>
                <DataTable value={data} removableSort paginator rows={5} tableStyle={{ minWidth: '160px' }}>
                    <Column field="name" header="Member" body={NameTemplate} style={{ minWidth: '70px'}} sortable></Column>
                    <Column field="phone" header="Phone" style={{ minWidth: '70px' }}></Column>
                    <Column field="point" header="Points" body={PointTemplate} style={{ minWidth: '70px' }}></Column>
                    {/* <Column field="email" header="Email" body={EmailTemplate} style={{ minWidth: '70px' }}></Column>
                    <Column field="dob" header="Date or Birth" body={DobTemplate} style={{ minWidth: '80px' }}></Column> */}
                    <Column field="rank" header="Ranking" body={RankingTemplate} style={{ minWidth: '80px' }} sortable></Column>
                    <Column field="created_at" header="Joined Date" body={JoinedTemplate} style={{ minWidth: '80px' }} sortable></Column>
                    <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                </DataTable>
            </div>
        </div>
    )
}