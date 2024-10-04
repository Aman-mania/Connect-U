const z=require("zod");
const validator=require("validator");

const clientsignupInput=z.object({
    name:z.string(),
    phone_number:z.string().refine(validator.isMobilePhone),
    password:z.string().min(8),
    address:z.string()
})

const workersignupInput=z.object({
    name:z.string(),
    phone_number:z.string().refine(validator.isMobilePhone),
    password:z.string().min(8),
    address:z.string(),
    profession:z.string(),
    charge_by_day:z.number(),
    charge_by_hours:z.number()
})


const signinInput=z.object({
    phone_number:z.string().refine(validator.isMobilePhone),
    password:z.string().min(8)
})

module.exports = {
    clientsignupInput,
    workersignupInput,
    signinInput
}
