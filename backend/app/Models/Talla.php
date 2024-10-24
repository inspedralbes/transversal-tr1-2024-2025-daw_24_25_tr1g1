<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Talla extends Model
{
    use HasFactory;

    protected $table = 'talla';
    protected $primaryKey = 'id_talla';
    protected $fillable = ['stockPorPrenda', 'nombre', 'prenda_id'];

    // Cada talla pertenece a una prenda
    public function prenda()
    {
        return $this->belongsTo(Prenda::class, 'prenda_id', 'id_prenda');
    }
}
