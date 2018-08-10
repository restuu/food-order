# FOOD SERVING CYCLE

## USAGE

END POINT  |  METHOD  |  Desc  |  Req
-----------|----------|--------|-------
/menu  |  GET  |  Get all menu list  |  -
/menu/add  |  POST  |  add new dish to menu (admin only)  |  **body**: name, price, cookingDuration, description; **file**: image;  **headers**: *authorization*: token
/menu/:dishId/update  |  PUT  |  Update dish in the menu (admin only)  |  **body**: name, price, cookingDuration, description; **file**: image;  **headers**: *authorization*: token
/menu/:dishId/delete  |  DELETE  |  Delete dish from menu (admin only)  |  **headers**: *authorization*: token
/users/register  |  POST  |  Add new user to database  |  **body**: name, role, email, password
/users/login  |  POST  | User login, will receive token  |  **body**: email, password
/order/add  |  POST  |  Add new order by user  |  **body**: orders, stringify array of obj[{dishId, qty}]; **headers**: *authorization*: token
/order/current  |  GET  |  Get list of current unprocessed ordered items, (for chef only)  |  **headers**: *authorization*: token
/order/:orderId/process  |  PUT  |  Chef start processing the order  |  **headers**: *authorization*: token
/order/queue/:orderNumber/complete  |  PUT  |  Chef complete order queue  |  **headers**: *authorization*: token

```txt
P.S.
-assumption on cooking duration
e.g
nasi goreng with duration of 10min
when 5 items ordered the cooking duration stays 10min not 50
```