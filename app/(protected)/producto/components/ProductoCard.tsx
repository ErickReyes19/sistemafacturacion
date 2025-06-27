import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, DollarSign, TrendingUp, Tag, Hash, Coins, Receipt, Scale, CheckCircle, XCircle } from "lucide-react"
import type { Producto as ProductoType } from "../type"

export function ProductoCard({ producto }: { producto: ProductoType }) {
  // Calculate profit margin
  const profitMargin = (((producto.precio_venta - producto.precio_compra) / producto.precio_compra) * 100).toFixed(2)
  const profit = (producto.precio_venta - producto.precio_compra).toFixed(2)

  return (
    <div className=" mx-auto p-6 space-y-6 border rounded-lg shadow-sm ">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{producto.nombre}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground">{producto.sku}</span>
              </div>
            </div>
          </div>

          {producto.descripcion && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{producto.descripcion}</p>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {producto.activo !== false ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle className="h-3 w-3 mr-1" />
              Activo
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <XCircle className="h-3 w-3 mr-1" />
              Inactivo
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Información de Precios</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Purchase Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Precio de Compra
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  L{producto.precio_compra.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-muted-foreground">{producto.moneda && `Moneda: ${producto.moneda}`}</div>
              </div>

              {/* Sale Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Precio de Venta
                </div>
                <div className="text-2xl font-bold text-green-600">
                  L {producto.precio_venta.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-muted-foreground">Por {producto.unidadBase || "unidad"}</div>
              </div>
            </div>

            <Separator />

            {/* Profit Analysis */}
            <div className=" p-4 rounded-lg border ">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium ">Análisis de Rentabilidad</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-green-600 mb-1">Margen de Ganancia</div>
                  <div className="text-xl font-bold text-green-700">{profitMargin}%</div>
                </div>
                <div>
                  <div className="text-xs text-green-600 mb-1">Ganancia por Unidad</div>
                  <div className="text-xl font-bold text-green-700">
                    L {Number(profit).toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Detalles del Producto</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category */}
            {producto.categoria && (
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Tag className="h-3.5 w-3.5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Categoría</div>
                  <div className="font-medium truncate">{producto.categoria}</div>
                </div>
              </div>
            )}

            {/* Unit of Measure */}
            {producto.unidadBase && (
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Scale className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Unidad de Medida</div>
                  <div className="font-medium truncate">{producto.unidadBase}</div>
                </div>
              </div>
            )}

            {/* Currency */}
            {producto.moneda && (
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-yellow-100 rounded-md">
                  <Coins className="h-3.5 w-3.5 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Moneda</div>
                  <div className="font-medium truncate">{producto.moneda}</div>
                </div>
              </div>
            )}

            {/* Tax */}
            {producto.impuesto && (
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-red-100 rounded-md">
                  <Receipt className="h-3.5 w-3.5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Impuesto</div>
                  <div className="font-medium truncate">{producto.impuesto}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Información Adicional</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{producto.sku}</div>
              <div className="text-xs text-muted-foreground">Código SKU</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {Number(profitMargin) > 0 ? "+" : ""}
                {profitMargin}%
              </div>
              <div className="text-xs text-muted-foreground">Margen de Ganancia</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{producto.activo !== false ? "Sí" : "No"}</div>
              <div className="text-xs text-muted-foreground">Producto Activo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
