import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCategories {
  id: number;
  content: string;
}

interface IDetalheCategories {
  id: number;
  content: string;
}

type TCategoriesComTotalCount = {
  data: IListagemCategories[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCategoriesComTotalCount | Error> => {
  try {
    const urlRelativa = `/categories?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&content_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheCategories | Error> => {
  try {
    const { data } = await Api.get(`/categories/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheCategories, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCategories>("/categories", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCategories
): Promise<void | Error> => {
  try {
    await Api.put(`/categories/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {
    await Api.delete(`/categories/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar o registro."
    );
  }
};

export const CategoriesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
