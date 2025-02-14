import { Clientnotification } from "../../components/Clientnotification";
import { DashboardClient } from "../../components/Dashboard-client"
import { clientNotification } from "../../hooks"

export const CNotification = () => {
    const { loding, notification } = clientNotification();
    if (loding) {
        return <div>
            <DashboardClient />
        </div>
    }
    else {
        return <div>
            <DashboardClient />
            {/* {console.log(notification)} */}
            <div className="flex justify-center">
                <div className="max-w-3xl">
                    {notification.map(msg => <Clientnotification
                        id={msg._id}
                        recievername={msg.recievername}
                        reciever_num={msg.reciever_num}
                    />)}     
                </div>
            </div>
        </div>
    }
}
