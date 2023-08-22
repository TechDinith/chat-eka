export const extractBirthYear = (nic: string): string => {
  if (nic.length === 10) {
    return "19" + nic.substring(0, 2);
  } else if (nic.length === 12) {
    return nic.substring(0, 4);
  }
  return "";
};

export const extractGender = (nic: string): string => {
  const genderDigits =
    nic.length === 10 ? nic.substr(2, 3) : nic.substr(nic.length - 4, 3);
  return parseInt(genderDigits) < 500 ? "Male" : "Female";
};

export const calculateAge = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};
