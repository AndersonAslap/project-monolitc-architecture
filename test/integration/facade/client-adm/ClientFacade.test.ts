import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../../../../src/modules/client-adm/infra/repository/sequelize/ClientModel"
import { ClientFacadeFactory } from "../../../../src/modules/client-adm/infra/factory/ClientFacadeFactory"
import { Client } from "../../../../src/modules/client-adm/domain/Client"
import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"


describe("ClientFacade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryClientFacade',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const clientFacade = ClientFacadeFactory.create()
        const spy = jest.spyOn(clientFacade, 'addClient')
        const input = {
            name: 'Anderson',
            email: 'aslap@gmail.com',
            address: {
                street: 'rua quarenta',
                number: 200,
                complement: '',
                city: '',
                state: 'Pernambuco',
                zip: '55555-555'
            }
        }
        await clientFacade.addClient(input)
        expect(spy).toBeCalled()
        expect(spy).toHaveBeenCalledWith(input)
    })

    it("should find a client", async () => {
        const clientFacade = ClientFacadeFactory.create()
        const client = new Client({
            name: 'Anderson',
            email: 'aslap@gmail.com',
            address: new Address('rua quarenta', 200, '', '', 'Pernambuco', '55555-555')
        })
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            street: client.address.street,
            number: client.address.number,
            complement: '',
            city: '',
            state: client.address.state,
            zip: client.address.zip,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
        const clientFind = await clientFacade.findClient({clientId: client.id.value})
        expect(clientFind?.clientId).toBe(client.id.value)
    })
})