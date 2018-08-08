# FOOD SERVING CYCLE

## USAGE

END POINT  |  METHOD  |  Desc  |  Req
-----------|----------|--------|-------
menu  |  GET  |  Get all menu list  |  -
users/register  |  POST  |  Add new user to database  |  **body**: name, role, email, password
users/login  |  POST  / User login, will receive token  |  **body**: email, password
users/order/add  |  POST  |  Add new order by user  |  **body**: menuId, qty
order  |  GET  |  Get list of ordered items  |  -