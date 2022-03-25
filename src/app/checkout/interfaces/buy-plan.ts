import { IPlanRequest } from "src/app/plans/interfaces/plans-request";
import { IPayment } from "./payment";
import { IPersonalInfo } from "./personal-info";

export interface IBuyPlan {
    personalInfo: IPersonalInfo;
    setupPlan: IPlanRequest;
    payment: IPayment;
}