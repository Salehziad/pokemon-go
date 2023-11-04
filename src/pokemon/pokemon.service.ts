import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { pokemon } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) { }

  async findAllWithFilters(filter: any, page: number, perPage: number) {
    const where = filter;
    const skip = page ? (page - 1) * perPage : 0; // Calculate 'skip' only if 'page' is provided
    const take = perPage; // 'take' is always set to 'perPage'

    const pokemons = await this.prisma.pokemon.findMany({
      where,
      skip,
      take,
    });

    return pokemons;
  }

  async findOne(id: string) {
    const result = await this.prisma.pokemon.findUnique({ where: { id } })
    return result;
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<pokemon> {
    return this.prisma.pokemon.create({
      data: createPokemonDto,
    });
  }

  async update(id: string, updateData: Partial<pokemon>): Promise<pokemon> {
    const updatedPokemon = await this.prisma.pokemon.update({
      where: { id },
      data: updateData,
    });

    return updatedPokemon;
  }

  async delete(id: string): Promise<void> {
    const pokemon = await this.findOne(id)

    if (!pokemon) {
      throw new Error(`Pokemon with ID ${id} not found`);
    }

    await this.prisma.pokemon.delete({
      where: { id },
    });
  }


  // read excel file and return json data
  async insertDateFromExcel(pathToFile: string) {
    try {
      // Read the file contents from the provided file path
      const fileContents = fs.readFileSync(pathToFile);

      // Parse the file contents using XLSX
      const workbook = XLSX.read(fileContents);
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
      );

      // loop through the data and create a new object for each row
      const data = xlData.map((row) => ({
        name: row['Name'],
        pokedexNumber: row['Pokedex Number'],
        imgName: row['Img name'].toString(),
        generation: row['Generation'],
        evolutionStage: row['Evolution Stage']
          ? row['Evolution Stage'].toString()
          : '',
        evolved: row['Evolved'],
        familyId: row['FamilyID'],
        crossGen: row['Cross Gen'],
        type1: row['Type 1'],
        type2: row['Type 2'],
        weather1: row['Weather 1'],
        weather2: row['Weather 2'],
        statTotal: row['STAT TOTAL'],
        atk: row['ATK'],
        def: row['DEF'],
        sta: row['STA'],
        legendary: row['Legendary'],
        aquireable: row['Aquireable'],
        spawns: row['Spawns'],
        regional: row['Regional'],
        raidable: row['Raidable'],
        hatchable: row['Hatchable'],
        shiny: row['Shiny'],
        nest: row['Nest'],
        new: row['New'],
        notGettable: row['Not-Gettable'],
        futureEvolve: row['Future Evolve'],
        cp40: row['100% CP @ 40'],
        cp39: row['100% CP @ 39'],
      }));
      // add the data to the database      
      try {
        await this.prisma.pokemon.createMany({
          data,
        });
      } catch (error) {
        console.error('Error inserting records:', error);
      }

      return { message: ' upload successfully' };
    } catch (error) {
      throw error;
    }
  }

}
