import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Importa los estilos que acabamos de añadir

function Terminos() {
  return (
    <div className="terminos-container">
      <h2>Términos y Condiciones</h2>
      
      <h3>Información General de la Empresa</h3>
      <p>
        <strong>Empresa:</strong> Ezequiel Castillo Ángeles Hair Designer<br />
        <strong>Domicilio:</strong> Velázquez Ibarra 22, colonia Centro, ciudad Huejutla, municipio o delegación Huejutla, C. P. 43011 en la entidad de Hidalgo, país México<br />
        <strong>Correo electrónico:</strong> ecastilloangeles@icloud.com<br />
        <strong>Teléfono:</strong> 7712028110 o 7713425696
      </p>

      <h3>Naturaleza del Negocio</h3>
      <p>Estética integral que ofrece servicios de belleza y cuidado personal (corte de cabello, barba, depilaciones, tintes) y comercializa productos cosméticos y tratamientos capilares.</p>

      <h3>Marco Legal</h3>
      <p>Este documento se sustenta en la Ley Federal de Protección al Consumidor (LFPC), la Ley de Comercio Electrónico, el Código de Comercio y demás leyes aplicables en México. El cliente goza de los derechos establecidos en la Ley Federal de Protección al Consumidor, incluido el derecho de recibir servicios y productos en condiciones óptimas, información veraz y la protección contra prácticas abusivas.</p>

      <h3>Aceptación de Términos</h3>
      <p>Al agendar una cita, adquirir un servicio o realizar una compra de productos (ya sea de forma presencial o mediante nuestra plataforma digital), el usuario acepta los presentes términos y condiciones. La aceptación se realiza al marcar la casilla 'Acepto Términos y Condiciones' y confirmar la cita o finalizar el proceso de compra. Los términos pueden ser modificados y el usuario deberá revisarlos periódicamente.</p>

      <h3>Proceso de Citas y Compra de Servicios</h3>
      <ul>
        <li><strong>Citas:</strong> Se realizan a través de nuestra plataforma digital oficial. Para confirmar la cita, se requiere un anticipo del 30% del valor total del servicio.</li>
        <li><strong>Servicios:</strong> El horario para servicios de tinte es limitado (de 11:00 a 16:00 hrs de Lunes a Viernes y hasta las 15:00 hrs Sábados) debido a la prolongada duración de estos tratamientos.</li>
        <li><strong>Compra de Productos:</strong> Selección de productos desde el catálogo digital. Agregar productos al carrito de compras. Confirmación de pedido y pago en línea mediante pasarelas seguras (tarjeta, PayPal, MercadoPago). El precio mostrado incluye impuestos aplicables.</li>
        <li><strong>Promociones y Cupones:</strong> Los descuentos, promociones o cupones se sujetarán a las condiciones específicas anunciadas en cada caso (como fechas de vigencia y aplicabilidad sobre productos o servicios). No son acumulables a menos que se indique lo contrario.</li>
      </ul>

      <h3>Envíos y Entregas</h3>
      <ul>
        <li><strong>Cobertura:</strong> Huejutla de Reyes y alrededores.</li>
        <li><strong>Modalidades:</strong> 1. Entrega sin costo: Cuando el personal esté disponible para realizarla en motocicleta. 2. Entrega con cargo: Cuando se requiera un servicio externo de mensajería; el costo será informado y asumido por el cliente.</li>
        <li><strong>Tiempo de entrega estimado:</strong> 2 a 5 días hábiles.</li>
        <li><strong>Envíos Tardíos o Dañados:</strong> En caso de que el envío no llegue en el tiempo estipulado por causas atribuibles a nosotros, nos contactaremos con el cliente para ofrecer una solución. Si el producto llega dañado, el cliente debe notificarlo dentro de las 24 horas siguientes a la recepción, adjuntando fotografías del empaque y del producto, para proceder con la reposición o reembolso.</li>
      </ul>

      <h3>Devoluciones, Cancelaciones y Modificaciones de Citas</h3>
      <ul>
        <li><strong>Cancelación de Cita con más de 24 horas de anticipación:</strong> Reembolso del 100% del anticipo o reprogramación sin costo.</li>
        <li><strong>Cancelación de Cita con menos de 24 horas:</strong> No hay reembolso, pero se puede reprogramar con un cargo administrativo del 10%.</li>
        <li><strong>No presentarse el día de la cita:</strong> Pérdida total del anticipo.</li>
        <li><strong>Devolución de Productos:</strong> Plazo: El cliente puede solicitar la devolución de un producto en un plazo máximo de 15 días naturales después de recibido. Devolución sin costo mientras el producto no haya sido enviado. Si el pedido está en tránsito, el cliente cubre el costo de devolución. Productos dañados o incorrectos podrán devolverse sin costo. Los productos deben devolverse sin usar, en su empaque original y sellado. Exclusiones: No son elegibles para devolución los productos de cuidado personal una vez abiertos, así como los servicios de estética ya prestados.</li>
      </ul>

      <h3>Garantías y Responsabilidades</h3>
      <ul>
        <li><strong>Productos:</strong> Cuentan con garantía de 30 días por defectos de fabricación. No aplica garantía en casos de mal uso o daño intencional. Para hacer efectiva la garantía, el cliente debe contactarnos vía correo electrónico o teléfono presentando su comprobante de compra y una descripción (o fotos) del defecto. Determinaremos si aplica reparación, reemplazo o reembolso.</li>
        <li><strong>Servicios:</strong> No nos hacemos responsables por reacciones alérgicas o efectos no deseados derivados de condiciones preexistentes no informadas por el cliente. El cliente se compromete a seguir las recomendaciones post-tratamiento.</li>
      </ul>

      <h3>Marco Legal y Resolución de Conflictos</h3>
      <ul>
        <li>Se reconoce el derecho del cliente a presentar quejas ante PROFECO.</li>
        <li>En caso de disputa, se aplicará la legislación mexicana y se acudirá a los tribunales competentes en Huejutla de Reyes, Hidalgo.</li>
      </ul>
      
      <p style={{marginTop: '20px', fontStyle: 'italic', fontSize: '0.9rem'}}>
        Fecha de última actualización: 10 de septiembre del 2025
      </p>

      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <Link to="/registro" className="submit-btn" style={{textDecoration: 'none'}}>Volver al Registro</Link>
      </div>
    </div>
  );
}

export default Terminos;