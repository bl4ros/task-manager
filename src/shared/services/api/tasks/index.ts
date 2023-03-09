import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemTasks {
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

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const TasksService = { getAll, getById, create, updateById, deleteById };
