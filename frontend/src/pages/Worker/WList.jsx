import { DashboardWorker } from "../../components/Dashboard-worker"
import { Clientlistcard } from "../../components/clientlistcard";
import { Workerlistcard } from "../../components/Workerlistcard";
import { workerList } from "../../hooks"
import { useEffect, useState } from "react";

export const WList = () => {
    const { loding, list } = workerList();
    const [data, setData] = useState([]);
    if (loding) {
        return <div>
            <DashboardWorker />
        </div>
    }
    else {
        if(data.length==0 && list.length>0){
            setData(list)
        }
        const [sortType, setSortType] = useState('rating');
        useEffect(() => {
            const sortArray = type => {
                const types = {
                    rating: 'rating',
                    charge_by_day: 'charge_by_day',
                    charge_by_hours: 'charge_by_hours',
                };
                const sortProperty = types[type];
                const sorted = [...list].sort((a, b) => b[sortProperty] - a[sortProperty]);
                setData(sorted);
            };
            sortArray(sortType);
        }, [sortType]);
        return <div>
            <DashboardWorker />
            <div>
                <form class="max-w-md mx-auto flex">
                    <label for="countries" class="block mb-2 text-md font-bold text-black dark:text-black w-1/3 p-2">Select an option</label>
                    <select onChange={(e) => setSortType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="rating">Rating</option>
                        <option value="charge_by_day">Charge_by_day</option>
                        <option value="charge_by_hours">Charge_by_hours</option>
                    </select>
                </form>
            </div>
            <div className="flex justify-center">
                <div className="max-w-3xl">
                    {/* {console.log(list)} */}
                    {data.map(l => <Workerlistcard
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
