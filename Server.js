import express from "express"
import dotenv from "dotenv"
import cors from "cors"
// const { getConnection, releaseConnection } = require('./db');
import OracleDB from "oracledb";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
// CORS middleware (so React can talk to backend)
app.use(cors());

let pool;
    async function connectToOracle() {
        try {
            pool = await OracleDB.createPool ({
                user : "APPVIEW",
                password : "APPVIEW",
                connectString : " 10.90.3.144:1521/ebs_BPPREPD",
            });
            console.log("Succesfully connected to Oracle Database!");
            console.log(pool);
        } catch (err) {
            console.error(" Error connecting to Oracle:", err);
        }
    }
    connectToOracle();

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log(`Received ${req.method} request on ${req.url}`);
    next();
});

// Login route
app.post("/index", async (req, res) => {
    const { username, password } = req.body;
    console.log("Body received:", req.body);

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

     const result = await Users.create({
        username  ,
        password
    })
    res.send({
        message : result
    })
});

// Test route
app.post("/Cust", (req, res) => {
    res.send("Hello world");
    console.log("heyaa");
});

// app.post("/sku", async(req, res) => {
//  const { sku } = req.body;
//     console.log("Body received:", req.body);

//     if (!sku) {
//         return res.status(400).json({ error: "sku required" });
//     }
//     const result1 = await UserSku.create({ sku }) 
//     res.send({
//         message : result1
//     })
// });

// 🔹 Your SQL API
app.get("/sku", async (req, res) => {
  const { org, sku } = req.query;   // example: /stock?org=LOC123&sku=SKU001
  try {
    const conn = await pool.getConnection();
    const result = await conn.execute(
      `SELECT
        SUBSTR(HOU.ATTRIBUTE4,1,2) REGN,
        HOU.NAME DEPOT,
        MSIB.SEGMENT1 SKU,
        MOQ.SUBINVENTORY_CODE SUBINVENTORY,
        MIL.SEGMENT1 LOCATOR,
        MSIB.DESCRIPTION,
        MSIB.SECONDARY_UOM_CODE UOM,
        SUM(MOQ.TRANSACTION_QUANTITY) QTY
      FROM
        MTL_ONHAND_QUANTITIES MOQ,
        MTL_SYSTEM_ITEMS_B MSIB,
        MTL_ITEM_LOCATIONS MIL,
        HR_ORGANIZATION_UNITS_V HOU
      WHERE MSIB.ORGANIZATION_ID=102
        AND MOQ.INVENTORY_ITEM_ID=MSIB.INVENTORY_ITEM_ID
        AND MOQ.LOCATOR_ID=MIL.INVENTORY_LOCATION_ID
        AND HOU.ORGANIZATION_ID=MOQ.ORGANIZATION_ID
        AND HOU.BUSINESS_GROUP_ID=81
        AND HOU.LOCATION_CODE=:P_ORG
        AND MSIB.SEGMENT1=:P_SKU
      GROUP BY
        SUBSTR(HOU.ATTRIBUTE4,1,2),
        HOU.NAME,
        MSIB.SEGMENT1,
        MOQ.SUBINVENTORY_CODE,
        MIL.SEGMENT1,
        MSIB.DESCRIPTION,
        MSIB.SECONDARY_UOM_CODE
      ORDER BY
        1,2,3,4,5`,
      { P_ORG: org, P_SKU: sku },     // bind variables
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/Int2_full", (req, res) => {
    res.send("Hello world");
    console.log("heyaa");
});
app.post("/Int2_res", (req, res) => {
    res.send("Hello world");
    console.log("heyaa");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});