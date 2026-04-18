interface OptionsData {
  name: string;
  id: number | string;
}

export const buildSelectOptions = (data: OptionsData[]) =>
  data.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));
