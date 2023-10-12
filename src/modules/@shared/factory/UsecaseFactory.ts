import { PlaceOrderUseCase } from "../../checkout/application/usecase/PlaceOrderUseCase";
import { ClientGateway } from "../../client-adm/application/gateway/ClientGateway";
import { AddClientUseCase } from "../../client-adm/application/usecase/AddClientUseCase";
import { InvoiceGateway } from "../../invoice/application/gateway/InvoiceGateway";
import { FindInvoiceUseCase } from "../../invoice/application/usecase/FindInvoiceUseCase";
import { ProductGateway } from "../../product-adm/application/gateway/ProductGateway";
import { AddProductUseCase } from "../../product-adm/application/usecase/AddProductUseCase";
import { UseCase } from "../application/usecase/UseCase";
import { FacadeFactory } from "./FacadeFactory";
import { RepositoryFactory } from "./RepositoryFactory";

export class UseCaseFactory {

    private repositoryProductAdm : ProductGateway
    private repositoryClient : ClientGateway
    private repositoryInvoice : InvoiceGateway

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryProductAdm = repositoryFactory.createProductAdmRepository()
        this.repositoryClient = repositoryFactory.createClientRepository()
        this.repositoryInvoice = repositoryFactory.createInvoiceRepository()
    }

    createAddProductUseCase() : UseCase {
        return new AddProductUseCase(this.repositoryProductAdm)
    }

    createAddClientUseCase() : UseCase {
        return new AddClientUseCase(this.repositoryClient)
    }

    createPlaceOrderUseCase() : UseCase {
        return new PlaceOrderUseCase(new FacadeFactory())
    }

    createFindInvoiceUseCase(): UseCase {
        return new FindInvoiceUseCase(this.repositoryInvoice)
    }
}