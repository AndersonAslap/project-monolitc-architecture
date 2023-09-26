import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../../../../src/modules/client-adm/infra/repository/sequelize/ClientModel"
import { ClientRepositoryDatabase } from "../../../../src/modules/client-adm/infra/repository/sequelize/ClientRepositoryDatabase"
import { Client } from "../../../../src/modules/client-adm/domain/Client"
import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"

describe("ClientRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryClientRepository',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should add a client", async () => {
        const clientRepository = new ClientRepositoryDatabase()
        const spy = jest.spyOn(clientRepository, 'add')
        const client = new Client({
            name: 'Anderson',
            email: 'aslap@gmail.com',
            address: new Address('rua quarenta', 200, '', '', 'Pernambuco', '55555-555')
        })
        await clientRepository.add(client)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(client)
    })

    it("should find a client", async () => {
        const clientRepository = new ClientRepositoryDatabase()
        const spy = jest.spyOn(clientRepository, 'find')
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
        const clientFind = await clientRepository.find(client.id.value)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(client.id.value)
        expect(clientFind.id.value).toBe(client.id.value)
    })
})