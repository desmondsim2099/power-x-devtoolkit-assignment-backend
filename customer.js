// This file will contain the queries to the customer table
const database = require("./database");
const express = require("express");

// Allows us to define a mapping from the URI to a function
router = express.Router();

// GET ALL CUS ID TEST COMMAND
router.get("/customer/all", (request, response) => {
  database.connection.all("select * from customer", (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// Get specific customer
router.post("/customer/id", (request, response) => {
    sqlStatement = `select name from customer where email = "${request.body.name}";`
    // console.log(sqlStatement);
    // console.log(request.body);
    database.connection.all(
        sqlStatement,
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred");
        } else {
          response.status(200).send(results);
        }
      }
    );
  });


// Add customer to DB 

// POST + PUT = Body, GET + DELETE = Query
router.put("/customer/add", (request, response) => {
    database.connection.all(
      `insert into customer (email , name) values ( "${request.body.email}" , "${request.body.name}" )`,
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred");
        } else {
          response.status(200).send("Record deleted successfully!");
        }
      }
    );
  });


// GET ALL ITEM 
router.get("/item/all", (request, response) => {
    database.connection.all("select * from item", (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    });
  });

// GET LAST SHOP ORDER ID
  router.get("/shop/newID", (request, response) => {
      database.connection.all("select max(id) from shop_order", (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred");
        } else {
          response.status(200).send(results);
        }
      });
    });


// PURCHASE ITEM
  router.put("/shop/add", (request, response) => {
    database.connection.all(
      `insert into shop_order (id, custEmail, itemID, quantity, address, order_date, shipping_date) values 
      ( "${request.body.id}" ,
      "${request.body.custEmail}" ,
      "${request.body.itemID}" ,
      "${request.body.quantity}" ,
      "${request.body.address}" ,
      "${request.body.order_date}" , 
      "${request.body.shipping_date}" )`,
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred");
        } else {
          response.status(200).send("Record deleted successfully!");
        }
      }
    );
  });

  // GET LAST SHOP ORDER ID
  router.post("/shop/allOrders", (request, response) => {
    sqlStatement = `select shop_order.id , customer.email , item.name , shop_order.quantity , 
                    shop_order.address , shop_order.order_date , shop_order.shipping_date  from shop_order
                    JOIN customer ON
                    customer.email = shop_order.custEmail
                    JOIN item ON
                    item.id = shop_order.itemID
                    WHERE customer.email = "${request.body.email}"`
    database.connection.all(sqlStatement, (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    });
  });

//Note: use query instead of all for MySQL - database.connection.query("select * from customer"

// defines an API which takes id in the request and return the record in response
router.get("/customer/id", (request, response) => {
  sqlst = `select * from customer where customer_id = ${request.query.cid}`; 
  database.connection.all(
    sqlst,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred" + sqlst);
      } else {
        response.status(200).send(results);
      }
    }
  );
});

// a POST API to store the record received in the request
router.post("/customer/add", (request, response) => {
  database.connection.all(
    `insert into customer (customer_name, customer_email) values ('${request.body.name}','${request.body.email}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});

// POST + PUT = Body, GET + DELETE = Query
router.delete("/customer/delete", (request, response) => {
  database.connection.all(
    `delete from customer where customer_id  = ${request.query.cid}`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record deleted successfully!");
      }
    }
  );
});

// a PUT API to update email for given customer id
router.put("/customer/change", (request, response) => {
  sqlstmt = `UPDATE customer SET customer_email = "${request.body.cemail}"
    WHERE customer_id  = ${request.body.cid}`;
  
  database.connection.all(
   sqlstmt,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred" + sqlstmt);
      } else {
        response.status(200).send("Record updated successfully!" + sqlstmt);
      }
    }
  );
});

/* `UPDATE customer
SET customer_email = ${request.query.cemail}
WHERE customer_id  = ${request.query.cid}`;

*/
module.exports = {
  router,
};
