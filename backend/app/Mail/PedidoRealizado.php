<?php
    namespace App\Mail;

    use Illuminate\Bus\Queueable;
    use Illuminate\Mail\Mailable;
    use Illuminate\Queue\SerializesModels;

    class PedidoRealizado extends Mailable
    {
        use Queueable, SerializesModels;

        public $compra;
        public $productosDetalles;

        /**
         * Nueva instancia de mensaje
         *
         * @param $compra
         * @param $productos
         */
        public function __construct($compra, $productos)
        {
            $this->compra = $compra;

            // Convertir cada producto a un objeto
            $this->productosDetalles = array_map(function($producto) {
                return (object) $producto;
            }, $productos);
        }

        /**
         * Mensaje
         *
         * @return $this
         */
        public function build()
        {
            return $this->subject('Confirmación de Compra')
                        ->view('emails.compra_realizada')
                        ->with([
                            'compra' => $this->compra,
                            'productosDetalles' => $this->productosDetalles
                        ]);
        }
    }