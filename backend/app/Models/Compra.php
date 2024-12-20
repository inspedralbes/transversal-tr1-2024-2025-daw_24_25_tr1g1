<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Compra extends Model {
        use HasFactory;

        protected $table = 'compras';
        protected $primaryKey = 'id_compra';
        protected $fillable = ['email', 'precio_total', 'estado'];

        public const ESTADOS = ['recibido', 'enviado', 'entregado'];
    }