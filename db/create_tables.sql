CREATE TABLE vehicles (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  mileage INTEGER NOT NULL,
  year INTEGER NOT NULL,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  licensePlate VARCHAR(255) NOT NULL,
  vin VARCHAR(255) NOT NULL,
  notes TEXT NOT NULL,
  dateCreated TIMESTAMPTZ NOT NULL,
  sharedWith UUID[] NOT NULL,
  imageUrl VARCHAR(255)
);

CREATE TABLE upcoming_maintenance (
  userId UUID NOT NULL,
  vehicleId UUID NOT NULL,
  sstId UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  dateDue TIMESTAMPTZ NOT NULL,
  mileageDue INTEGER NOT NULL,
  isOverdue BOOLEAN NOT NULL
);

CREATE TABLE scheduled_service_type (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL,
  dateCreated TIMESTAMPTZ NOT NULL
);

CREATE TABLE vehicle_schedule (
  vehicleId UUID NOT NULL,
  sstId UUID NOT NULL,
  mileInterval INTEGER NOT NULL,
  timeInterval INTERVAL NOT NULL,
  timeUnits VARCHAR(10) NOT NULL CHECK (timeUnits IN ('day', 'week', 'month', 'year')),
  PRIMARY KEY (vehicleId)
);

CREATE TABLE scheduled_service_log (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL,
  vehicleId UUID NOT NULL,
  sstId UUID NOT NULL,
  datePerformed TIMESTAMPTZ NOT NULL,
  name VARCHAR(255) NOT NULL,
  mileagePerformed INTEGER NOT NULL,
  nextServiceDate TIMESTAMPTZ,
  nextServiceMileage INTEGER,
  partsCost NUMERIC(10, 2) NOT NULL,
  laborCost NUMERIC(10, 2) NOT NULL,
  totalCost NUMERIC(10, 2) NOT NULL,
  notes TEXT NOT NULL
);

CREATE TABLE repair_log (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL,
  vehicleId UUID NOT NULL,
  datePerformed TIMESTAMPTZ NOT NULL,
  name VARCHAR(255) NOT NULL,
  mileagePerformed INTEGER NOT NULL,
  partsCost NUMERIC(10, 2) NOT NULL,
  laborCost NUMERIC(10, 2) NOT NULL,
  totalCost NUMERIC(10, 2) NOT NULL,
  notes TEXT NOT NULL
);
