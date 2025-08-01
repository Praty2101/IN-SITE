import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Tv, Wifi } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddCustomerDialogProps {
  onCustomerAdded: () => void;
}

export const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ onCustomerAdded }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    service_type: '',
    package_name: '',
    dealer: '',
    status: 'Active',
    package_amount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      service_type: '',
      package_name: '',
      dealer: '',
      status: 'Active',
      package_amount: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dealer) {
      toast({
        title: "Validation Error",
        description: "Name and Dealer are required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const customerId = Math.floor(Math.random() * 1000000);
      let insertData: any = {};

      if (formData.dealer === 'BC' || formData.dealer === 'JC') {
        // Cable TV customer format
        insertData = {
          'VC No.': customerId,
          'CONTRACT_NUMBER': customerId,
          'NAME': formData.name,
          'MOBILE_PHONE': formData.phone ? parseInt(formData.phone) : null,
          'EMAIL': formData.email || null,
          'ADDRESS1': formData.address,
          'CITY': formData.city,
          'PACKAGE_NAME': formData.package_name,
          'STATUS': formData.status.toUpperCase(),
          'START_DATE': new Date().toISOString().split('T')[0],
          'ORDER_DATE': new Date().toISOString().split('T')[0],
          'PLAN_TYPE': 'Cable TV'
        };
      } else if (formData.dealer === 'GB' || formData.dealer === 'MB') {
        // Broadband customer format
        insertData = {
          'CustomerId': customerId,
          'CustomerName': formData.name,
          'Package': formData.package_name,
          'PackageAmount': formData.package_amount ? parseFloat(formData.package_amount) : null,
          'Cashier': 'Manual Entry'
        };
      }

      const { error } = await supabase
        .from(formData.dealer as 'BC' | 'JC' | 'GB' | 'MB')
        .insert([insertData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Customer Added",
        description: `Successfully added ${formData.name} to ${formData.dealer} database`,
      });

      resetForm();
      setOpen(false);
      onCustomerAdded();
      
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "Error",
        description: "Failed to add customer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone number"
                type="tel"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Full address"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dealer">Dealer *</Label>
              <Select value={formData.dealer} onValueChange={(value) => handleInputChange('dealer', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dealer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BC">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      BC (Cable TV)
                    </div>
                  </SelectItem>
                  <SelectItem value="JC">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      JC (Cable TV)
                    </div>
                  </SelectItem>
                  <SelectItem value="GB">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      GB (Broadband)
                    </div>
                  </SelectItem>
                  <SelectItem value="MB">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      MB (Broadband)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package_name">Package</Label>
              <Input
                id="package_name"
                value={formData.package_name}
                onChange={(e) => handleInputChange('package_name', e.target.value)}
                placeholder="Package name"
              />
            </div>
            {(formData.dealer === 'GB' || formData.dealer === 'MB') && (
              <div className="space-y-2">
                <Label htmlFor="package_amount">Package Amount</Label>
                <Input
                  id="package_amount"
                  type="number"
                  value={formData.package_amount}
                  onChange={(e) => handleInputChange('package_amount', e.target.value)}
                  placeholder="Amount in ₹"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};