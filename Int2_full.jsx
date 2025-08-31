import './Int2_full.css'

function Int2_full(){
    return(
        <div>
  <input type="checkbox" id="menu-toggle" />
  <label for="menu-toggle" className="menu-icon">&#9776;</label>

  <div className="sidebar">
    <h1>BERGER</h1>
    <a href="/Menu">MENU</a>
    <a href="/">REPORTS</a>
    <a href="/Sku">ENTRY</a>
    <a href="/Cust">DATA</a>
  </div>

  <div className="content">
    <h1>Welcome </h1>
    <p>
        BERGER PAINTS INDIA
        
    </p>
  </div>
</div>
    );
}
 export default Int2_full