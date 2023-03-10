import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemTasks {
  id: number;
  content: string;
  categoryId: number;
}

interface IDetalheTasks {
  id: number;
  content: string;
  categoryId: number;
}

type TTaskComTotalCount = {
  data: IListagemTasks[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TTaskComTotalCount | Error> => {
  try {
    const urlRelativa = `/tasks?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&content_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheTasks | Error> => {
  try {
    const { data } = await Api.get(`/tasks/${id}`);

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
  dados: Omit<IDetalheTasks, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheTasks>("/tasks", dados);

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
  dados: IDetalheTasks
): Promise<void | Error> => {
  try {
    await Api.put(`/tasks/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {
    await Api.delete(`/tasks/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar o registro."
    );
  }
};

export const TasksService = { getAll, getById, create, updateById, deleteById };
