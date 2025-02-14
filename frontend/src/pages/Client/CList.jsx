import { useEffect, useState } from "react";
import { DashboardClient } from "../../components/Dashboard-client"
import { Clientlistcard } from "../../components/clientlistcard";
import { clientList } from "../../hooks"

export const CList = () => {
    const { loding, list } = clientList();
    const [data, setData] = useState([]);

    if (loding) {
        return <div>
            <DashboardClient />
        </div>
    }
    else {
        if(data.length==0 && list.length>0){
            setData(list)
        }
        const [sortType, setSortType] = useState('distance');
        useEffect(() => {
            const sortArray = type => {
                const types = {
                    distance:'distance',
                    rating: 'rating',
                    charge_by_day: 'charge_by_day',
                    charge_by_hours: 'charge_by_hours',
                };
                const sortProperty = types[type];
                const sorted = type=="rating"?[...list].sort((a, b) => b[sortProperty] - a[sortProperty]):[...list].sort((a, b) => a[sortProperty] - b[sortProperty]);
                setData(sorted);
            };
            sortArray(sortType);
        }, [sortType]);
        return <div>
            <DashboardClient />
            {/* {console.log({data})} */}
            <div>
                <form class="max-w-md mx-auto flex">
                    <label for="countries" class="block mb-2 text-md font-bold text-black dark:text-black w-1/3 p-2">Select an option</label>
                    <select onChange={(e) => setSortType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="distance">Distance</option>
                        <option value="rating">Rating</option>
                        <option value="charge_by_day">Charge_by_day</option>
                        <option value="charge_by_hours">Charge_by_hours</option>
                    </select>
                </form>
            </div>
            <div className="flex justify-center">
                <div className="max-w-3xl">
                    {data.map(l => <Clientlistcard
                        id={l._id}
                        name={l.name}
                        profession={l.profession}
                        charge_by_day={l.charge_by_day}
                        charge_by_hours={l.charge_by_hours}
                        rating={l.rating}
                        distance={l.distance}
                    />)}
                </div>
            </div>
        </div>
    }
}
