-- Add initial_stock_quantity column to track original stock for low stock calculations
ALTER TABLE public.products 
ADD COLUMN initial_stock_quantity integer DEFAULT 0 NOT NULL;

-- Update existing products to set initial_stock_quantity equal to current stock_quantity
UPDATE public.products 
SET initial_stock_quantity = stock_quantity 
WHERE initial_stock_quantity = 0;