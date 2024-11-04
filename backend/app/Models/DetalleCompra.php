<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCompra extends Model
{
    use HasFactory;

    protected $table = 'detalle_compras'; // Nombre de la tabla
    protected $primaryKey = 'id_detalle'; // Clave primaria
    protected $fillable = ['id_compra', 'id_prenda', 'talla']; // Campos que se pueden llenar
}
