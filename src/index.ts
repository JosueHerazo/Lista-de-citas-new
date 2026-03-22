<<<<<<< HEAD
import server from "./server"
import colors from "colors";
=======
import server from "./server";
import colors from "colors"
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

const port = process.env.PORT || 4000
server.listen(port, () =>{
    console.log(colors.bgMagenta.bold(`REST API en el puerto ${port}`));
    
}) 