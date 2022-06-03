package <%= entity.repositoryDirectory %>;

import <%= entity.modelDirectory %>.<%= entity.name %>;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface <%= entity.name %>Repository extends MongoRepository<<%= entity.name %>, String>{

}
