type User = {
  id: string;
  sub: string;
  id_number: string;
  username?: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  email?: string;
  contact_number: string;
  department?: string;
  employment_status: string;
  date_employed?: Date;
  salary?: number;
  vacation_leave?: number;
  sick_leave?: number;
};

type DayFields = {
  [K in
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"]: {
    day: string;
    start_time: string;
    end_time: string;
    employee_id: string;
  };
};

type FormFieldNames = {
  [K in keyof DayFields as
    | `${K}.day`
    | `${K}.start_time`
    | `${K}.end_time`
    | `${K}.employee_id`]: string;
};
