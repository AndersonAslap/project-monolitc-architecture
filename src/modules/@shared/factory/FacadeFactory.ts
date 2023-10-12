import { ClientFacadeInterface } from "../../client-adm/application/facade/ClientFacadeInterface";
import { ClientFacadeFactory } from "../../client-adm/infra/factory/ClientFacadeFactory";
import { InvoiceFacadeInterface } from "../../invoice/application/facade/InvoiceFacadeInterface";
import { InvoiceFacadeFactory } from "../../invoice/infra/factory/InvoiceFacadeFactory";
import { TransactionFacadeInterface } from "../../payment/application/facade/TransactionFacadeInterface";
import { TransactionFacadeFactory } from "../../payment/infra/factory/TransactionFacadeFactory";
import { ProductFacadeInterface } from "../../product-adm/application/facade/ProductFacadeInterface";
import { ProductFacadeFactory } from "../../product-adm/infra/factory/ProductFacadeFactory";
import { ProductStoreCatalogFacadeInterface } from "../../store-catalog/application/facade/ProductFacadeInterface";
import { ProductStoreCatalogFacadeFactory } from "../../store-catalog/infra/factory/ProductFacadeFactory";

export class FacadeFactory {

    createInvoiceFacade(): InvoiceFacadeInterface {
        return InvoiceFacadeFactory.create()
    } 

    createClientAdminFacade(): ClientFacadeInterface {
        return ClientFacadeFactory.create()
    }

    createPaymentFacade(): TransactionFacadeInterface {
        return TransactionFacadeFactory.create()
    }

    createProductAdminFacade(): ProductFacadeInterface {
        return ProductFacadeFactory.create()
    }

    createStoreCatalogFacade(): ProductStoreCatalogFacadeInterface {
        return ProductStoreCatalogFacadeFactory.create()
    }
}