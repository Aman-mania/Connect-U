import { DashboardWorker } from "../../components/Dashboard-worker"
import { Workernotification } from "../../components/Workernotification";
import { workerNotification } from "../../hooks"

export const WNotification = () => {
    const { loding, notification } = workerNotification();
    if (loding) {
        return <div>
            <DashboardWorker />
        </div>
    }
    else {
        return <div>
            <DashboardWorker />
            {/* {console.log(notification)} */}
            <div className="flex justify-center">
                <div className="max-w-3xl">
                    {notification.map(msg => <Workernotification
                        id={msg._id}
                        sendername={msg.sendername}
                        sendernum={msg.sendernum}
                        senderadd={msg.senderadd}
                        senderrat={msg.senderrat}
                    />)}
                </div>
            </div>
        </div>
    }
}
