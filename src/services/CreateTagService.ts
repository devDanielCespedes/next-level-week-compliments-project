import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if(!name) {
      throw new Error("Incorrent name!");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({name})

    if(tagAlreadyExists) {
      throw Error("Tag already exists")
    }
    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag)
    return tag
  }
}

export { CreateTagService }
