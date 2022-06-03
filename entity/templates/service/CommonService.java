package <%= servicePackage %>;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface CommonService <E, I> {

    public E createOrUpdate(E entity);

    public void delete(I id);

    public List<E> getAll();

    public Optional<E> getById(I id);

    public Boolean exists(I id);
}
