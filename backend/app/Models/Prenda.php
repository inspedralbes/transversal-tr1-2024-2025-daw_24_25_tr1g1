<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Prenda extends Model{
    use HasFactory;

    protected $table = 'prenda';
    protected $primaryKey = 'id_prenda';

    protected $fillable = [
        'nombre', 'precio', 'descripcion', 'descuento', 
        'categoria_id', 'sexo'
    ];

    // Relación: Una prenda pertenece a una categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id', 'id_categoria');
    }

    // Relación: Una prenda puede tener muchas tallas
    public function tallas()
    {
        return $this->hasMany(Talla::class, 'prenda_id', 'id_prenda');
    }

    // Relación: Una prenda puede tener muchas imágenes
    public function imagenes()
    {
        return $this->hasMany(Imagenes::class, 'prenda_id', 'id_prenda');
    }
}
