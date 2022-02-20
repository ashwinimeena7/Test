using { ashwini.db.CDSViews } from '../db/CDSViews';

using { ashwini.db.master, ashwini.db.transaction } from '../db/datamodel';

service CDSService@(path:'/CDSService') {

    entity POWorklist as projection on CDSViews.POWorklist;
    entity ProductOrders as projection on CDSViews.ProductViewSub;
    entity ProductAggregation as projection on CDSViews.CProductValuesView;
   

}