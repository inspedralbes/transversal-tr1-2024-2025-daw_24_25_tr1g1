<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\content;
use Illuminate\Queue\SerializesModels;

class PedidoRealizado extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;
    public $productosDetalles;

    public function __construct($compra, $productos)
    {
        $this->compra = $compra;

        // Convertir cada producto a un objeto para evitar errores de acceso
        $this->productosDetalles = array_map(function($producto) {
            return (object) $producto;
        }, $productos);
    }

    public function build()
    {
        return $this->subject('Confirmación de Compra')
                    ->view('emails.compra_realizada')
                    ->with([
                        'compra' => $this->compra,
                        'productosDetalles' => $this->productosDetalles
                    ]);
    }

    /**
     * Define el sobre del mensaje.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmación de tu compra',
        );
    }

    /**
     * Define el contenido del mensaje.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.compra_realizada',
        );
    }

    /**
     * Define los archivos adjuntos del mensaje.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}