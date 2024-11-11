<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class DetalleCompra extends Model
    {
        use HasFactory;

        protected $table = 'detalle_compras';
        protected $primaryKey = 'id_detalle';
        protected $fillable = ['id_compra', 'id_prenda', 'talla'];
    }