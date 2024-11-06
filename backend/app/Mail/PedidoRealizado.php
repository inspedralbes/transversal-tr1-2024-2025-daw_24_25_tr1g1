<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PedidoRealizado extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;
    public $productosDetalles;

    /**
     * Crea una nueva instancia de mensaje.
     */
    public function __construct($compra, $productosDetalles)
    {
        $this->compra = $compra;
        $this->productosDetalles = $productosDetalles;
    }

    public function build()
    {
        return $this->view('emails.compra_recibida')
                    ->subject('Confirmación de tu compra')
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
