import { DashboardWorker } from "../../components/Dashboard-worker"
import { Workerfeedback } from "../../components/Workerfeedback";
import { workerFeedback } from "../../hooks"

export const WFeedback = () => {
    const { loding, feedback } = workerFeedback();
    if (loding) {
        return <div>
            <DashboardWorker />
        </div>
    }
    else {
        return <div>
            <DashboardWorker />
            {/* {console.log(feedback)} */}
            <div className="flex justify-center">
                <div className="max-w-3xl">
                    {feedback.map(msg => <Workerfeedback
                        id={msg._id}
                        sendername={msg.sendername}
                        sendernum={msg.sendernum}
                    />)}
                </div>
            </div>
        </div>
    }
}
